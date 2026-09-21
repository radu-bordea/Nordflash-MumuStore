import { Separator } from "@/components/ui/separator";

const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-wider capitalize mb-8 border-l-4 border-gold pl-4">
        {text}
      </h2>
      <Separator className="bg-gold/40" />
    </div>
  );
};
export default SectionTitle;