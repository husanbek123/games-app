import Instance from "./instace";

export let api_key = "57e85b9f545c4fc187b3a66543b4a480";

export default async function GET(api: string, limit: number = 25) {
  let res = await Instance.get(api + `&page_size=${limit}`);
  let data = res.data;
  return data;
}
