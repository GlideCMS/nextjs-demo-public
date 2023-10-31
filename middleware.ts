import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const basePath = req.nextUrl.basePath;
  const response = NextResponse.next();
  //logic which will add no idex tag
  if (process.env.ENVIRONMENT !== "prod") {
    response.headers.set("x-robots-tag", "noindex");
  } else if (process.env.NOINDEX_LIST) {
    const noIndexArray = process.env.NOINDEX_LIST
      ? JSON.parse(process.env.NOINDEX_LIST)
      : null;
    const addNoIndex = noIndexArray.some((t) => new RegExp(t).test(basePath));
    if (addNoIndex) {
      response.headers.set("x-robots-tag", "noindex");
    }
  }
  return response;
}
