import { SimpleGrid } from "@chakra-ui/react";

type Props = {
  children: [React.ReactNode, React.ReactNode];
};

function SplitView({ children }: Props) {
  return (
    <SimpleGrid columns={[1, 1, 1, 2]} gap={4} alignItems="start">
      {children}
    </SimpleGrid>
  );
}

export default SplitView;
