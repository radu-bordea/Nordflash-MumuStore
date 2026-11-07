"use client";

import { useState } from "react";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormInput from "@/components/form/FormInput";

export default function PreorderFields({
  defaultChecked = false,
  defaultNote = "",
}: {
  defaultChecked?: boolean;
  defaultNote?: string;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <>
      <div
        className="flex items-center space-x-2"
        onChange={(e) => {
          const t = e.target as HTMLInputElement;
          if (t.name === "allowPreorder") setEnabled(t.checked);
        }}
      >
        <CheckboxInput
          name="allowPreorder"
          label="tillat forhåndsbestilling"
          defaultChecked={defaultChecked}
        />
      </div>

      {enabled && (
        <div className="mt-4">
          <FormInput
            type="text"
            name="preorderNote"
            label="Forhåndsbestillingsinfo (valgfritt)"
            defaultValue={defaultNote}
            placeholder="F.eks. Forventet på lager om 2 uker"
            required={false}
          />
        </div>
      )}
    </>
  );
}