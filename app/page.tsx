import Invitation from "@/components/Invitation";
import { getWedding } from "@/lib";

export default function Page() {
  return <Invitation w={getWedding()} />;
}
