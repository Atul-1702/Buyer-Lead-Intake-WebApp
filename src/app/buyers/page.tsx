import BuyersComponent from "./components/buyers-component";

async function fetchData(
  page: number,
  limit: number,
  city: string,
  propertyType: string,
  timeline: string
) {
  let filteredData: any = await fetch(
    process.env.BASE_URL +
      `api/buyers/pagination?city=${city}&propertyType=${propertyType}&timeline=${timeline}&page=${page}&limit=${limit}`,
    {
      method: "get",
      headers: {
        content: "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlOTFhODdkLWNmNzctNDg0Zi04ODhiLTQxNDIzYjY3NWQ5YSIsInVzZXJpZCI6Imtpc2hvcl9rdW5hbCIsImVtYWlsIjoia3VuYWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQ0wxNTAxZUpGbzZ3ejAvUVM4OFFqLkpMTmtxcHNCOWszUENuOW5KVEVDL0V4SHZaUGd1SjYiLCJyb2xlIjoiREVBTEVSIiwiaWF0IjoxNzU3ODc0MzIwLCJleHAiOjE3NTkzMTQzMjB9.8vEEXIfGzJ7jhowmFJrr0UzVuK0tDxyf-KTfrZR330Q",
      },
    }
  );
  filteredData = await filteredData.json();
  return filteredData;
}

async function Page({ searchParams }) {
  let queryParams = await searchParams;

  if (!queryParams.page) {
    queryParams.page = 1;
  }
  if (!queryParams.limit) {
    queryParams.limit = 10;
  }
  if (!queryParams.city) {
    queryParams.city = "all";
  }
  if (!queryParams.timeline) {
    queryParams.timeline = "all";
  }
  if (!queryParams.propertyType) {
    queryParams.propertyType = "all";
  }

  const filteredData = await fetchData(
    Number(queryParams.page),
    Number(queryParams.limit),
    queryParams.city,
    queryParams.propertyType,
    queryParams.timeline
  );

  return (
    <>
      {filteredData && (
        <BuyersComponent
          filterData={filteredData.details}
          totalRecords={filteredData.totalRecords}
          ownerId={filteredData.ownerId}
        ></BuyersComponent>
      )}
    </>
  );
}

export default Page;
