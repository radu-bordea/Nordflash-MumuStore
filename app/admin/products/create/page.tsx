import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProductAction } from "@/utils/actions";
import { faker } from "@faker-js/faker";

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
            <PriceInput />
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
