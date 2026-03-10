import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProductAction } from "@/utils/actions";
import { faker } from "@faker-js/faker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputNumberProps = {
  defaultValue?: number;
  name: string;
  label: string;
  min?: number;
};

// Reusable Number Input Component
function NumberInput({ defaultValue, name, label, min = 0 }: FormInputNumberProps) {
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

// Optional PriceInput wrapper (can reuse NumberInput)
function PriceInput({ defaultValue }: { defaultValue?: number }) {
  return <NumberInput name="price" label="Pris ($)" defaultValue={defaultValue ?? 100} min={0} />;
}

// Optional StockInput wrapper
function StockInput({ defaultValue }: { defaultValue?: number }) {
  return <NumberInput name="stock" label="Lagerbeholdning" defaultValue={defaultValue ?? 0} min={0} />;
}

const CreateProductPage = () => {
  const name = faker.commerce.product();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">lage produkt</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
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
            <PriceInput defaultValue={100} />
            <StockInput defaultValue={0} />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="produktbeskrivelse"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput name="featured" label="fremhevet" />
          </div>
          <SubmitButton text="lage produkt" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProductPage;