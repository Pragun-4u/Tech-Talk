"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeProvider";
import { AnswerSchema } from "@/lib/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Answer = () => {
  const { mode } = useTheme();
  console.log(mode);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const HandleAnswerSubmit = () => {};

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your Answer here
        </h4>
        <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-100 " onClick={()=>{}}>
          {" "}
          <Image
            src="/assets/icons/stars.svg"
            width={12}
            height={12}
            alt="star"
            className="object-contain"
          />{" "}
          Generate an AI Answer
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
        </form>
      </Form>
    </div>
  );
};

export default Answer;
