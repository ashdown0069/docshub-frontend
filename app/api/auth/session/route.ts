import { getSession, updateSession } from "@/auth/auth-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json(session);
  } catch (error) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function POST(Req: NextRequest) {
  const res = await Req.json();

  try {
    const result = await updateSession(res.accessToken);
    return NextResponse.json({
      isSucess: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "update session failed",
      },
      { status: 500 },
    );
  }
}
