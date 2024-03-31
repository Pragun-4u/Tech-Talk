"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/ServerActions/Answer.action";
import { AnswerSchema } from "@/lib/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Answer = ({
  authorId,
  questionID,
  question,
}: {
  question: string;
  questionID: string;
  authorId: string;
}) => {
  const { mode } = useTheme();
  const pathname = usePathname();
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isSubmittingAI, setisSubmittingAI] = useState(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const questionParsed = JSON.parse(question);

  const HandleAnswerSubmit = async (value: z.infer<typeof AnswerSchema>) => {
    setisSubmitting(true);
    try {
      await createAnswer({
        description: value.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionID),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
      toast({
        title: `Answer Submitted Successfully`,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: `Answer Submission Failed`,
        variant: "destructive",
      });
    } finally {
      setisSubmitting(false);
    }
  };

  const GenerateAIAnswer = async () => {
    if (!authorId) return;
    setisSubmittingAI(true);
    // const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      const res = await fetch(`https://techtalk.pragun.cloud/api/AI`, {
        method: "POST",
        body: JSON.stringify({ questionParsed }),
      });

      const AnswerAI = await res.json();

      const formattedAnswer = AnswerAI?.reply?.replace(/\n/g, "<br />");

      if (editorRef.current) {
        const editor = editorRef.current as any;
        const currentContent = editor.getContent();
        editor.setContent(`${currentContent} ${formattedAnswer}`);
      }
      toast({
        title: `AI Answered this Question Successfully`,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: `AI Answer Failed`,
        variant: "destructive",
      });
    } finally {
      setisSubmittingAI(false);
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your Answer here
        </h4>
        <Button
          disabled={isSubmittingAI}
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-100 "
          onClick={GenerateAIAnswer}
        >
          {" "}
          <Image
            src="/assets/icons/stars.svg"
            width={12}
            height={12}
            alt="star"
            className="object-contain"
          />{" "}
          {isSubmittingAI
            ? "Generating an AI answer..."
            : "Generate an AI Answer"}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(HandleAnswerSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    //  @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue="Type your Answer here."
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormDescription className="text-dark300_light700">
                  Thoroughly explain your Answer, to help the community.
                </FormDescription>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Answer;
