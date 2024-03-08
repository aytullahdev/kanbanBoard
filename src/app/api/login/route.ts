import axios from "@/libs/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Get the form data
  const formData = await request.formData();
  // Send the form data to the server
  const { data } = await axios.post(`/auth/login`, formData);

  //   set the token as cookie and send back the data to the client
  if (data && data.token) {
    // also set the cookie origin as the main domain

    return NextResponse.json(data, {
      headers: {
        "Set-Cookie": `token=${data.token};  Max-Age=${
          60 * 60
        }; Path=/; Secure;`,
      },
    });
  }
  return NextResponse.json(
    { message: "Invalid Email or Password" },
    { status: 401 }
  );
}
