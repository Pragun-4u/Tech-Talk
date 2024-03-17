import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  //  @ts-ignore
  const { questionParsed } = await request.json();

  console.log({ questionParsed });

  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a Knowledgeable assistant whatever technology related Questions will be asked you have to reply and answer that Question Effectively.",
          },
          {
            role: "user",
            content: `How Do I solve this? 
            Refer to the Title and description of the following Question and Reply accordingly.
            Title:  ${questionParsed.title},
            Description: ${questionParsed.description} `,
          },
        ],
      }),
    });

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
