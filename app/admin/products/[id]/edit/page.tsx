import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import { redirect } from "next/navigation";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Params = { id: string } | Promise<{ id: string }>;

// Reusable Number Input Component
type NumberInputProps = {
  name: string;
  label: string;
  defaultValue?: number;
  min?: number;
};
function NumberInput({ name, label, defaultValue, min = 0 }: NumberInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize mb-2">
        {label}
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={min}
        defaultValue={defaultValue ?? min}
        required
      />
    </div>
  );
}

// Optional wrappers for Price and Stock
function PriceInput({ defaultValue }: { defaultValue?: number }) {
  return <NumberInput name="price" label="Pris ($)" defaultValue={defaultValue ?? 100} min={0} />;
}
function StockInput({ defaultValue }: { defaultValue?: number }) {
  return <NumberInput name="stock" label="Lagerbeholdning" defaultValue={defaultValue ?? 0} min={0} />;
}

// Resolve route params safely
async function resolveParams(params: Params) {
  const resolved = await params;
  if (!resolved?.id) {
    console.error("❌ Missing route param:", resolved);
    redirect("/admin/products");
  }
  return resolved.id;
}

async function EditProductPage({ params }: { params: Params }) {
  const id = await resolveParams(params);
  const product = await fetchAdminProductDetails(id);
  const { name, company, description, featured, price, stock } = product;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">oppdater produktet</h1>
      <div className="border p-8 rounded-md">
        {/* IMAGE INPUT CONTAINER */}
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>

        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />

            <FormInput
              type="text"
              name="name"
              label="produktnavn"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="bedrift"
              defaultValue={company}
            />

            <PriceInput defaultValue={price} />
            <StockInput defaultValue={stock} />
          </div>

          <TextAreaInput
            name="description"
            labelText="produktbeskrivelse"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="fremhevet"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="oppdater produktet" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditProductPage;