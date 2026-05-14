import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Magic Coils Distributor",
  description:
    "Apply for Magic Coils distributor and wholesale opportunities for salons and professional retail partners.",
  alternates: { canonical: "https://magiccoils.net/distributor" },
  openGraph: {
    title: "Become a Magic Coils Distributor",
    description:
      "Wholesale and distributor opportunities for salons and professional partners.",
    url: "https://magiccoils.net/distributor",
    type: "article",
  },
};

export default function DistributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
