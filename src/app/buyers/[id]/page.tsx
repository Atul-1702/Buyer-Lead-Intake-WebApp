import LeadForm from "./../components/LeadForm";

async function fetchBuyerData(id: string) {
  let buyerDetails: any = await fetch(
    process.env.BASE_URL + "api/buyers/details",
    {
      method: "post",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  buyerDetails = await buyerDetails.json();
  return buyerDetails;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const buyerDetails = await fetchBuyerData(id);
  return (
    <main>
      <LeadForm buyerDetails={buyerDetails.buyerDetails}></LeadForm>
    </main>
  );
}
