import { redirect } from "next/navigation";

export function GET() {
  redirect("https://www.google.com/search?q=google+review");
}
