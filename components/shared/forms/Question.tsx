"use client";
import * as z from "zod";
import React, { useRef, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { QuestionType } from "@/lib/zodValidation";
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
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  createQuestion,
  editQuestion,
} from "@/lib/ServerActions/Question.action";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";
import { toast } from "@/components/ui/use-toast";

interface Props {
  mongoUserId: string;
  type?: string;
  questionDetails?: string;
}

const Question = ({ type, mongoUserId, questionDetails }: Props) => {
  const { mode } = useTheme();
  const parsedQuestionDetails =
    type === "Edit" && JSON.parse(questionDetails || "");
  const groupedTags =
    type === "Edit" && parsedQuestionDetails?.tags.map((tag: any) => tag.name);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isSubmitting, setisSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionType>>({
    resolver: zodResolver(QuestionType),
    defaultValues: {
      Title: parsedQuestionDetails.title || "",
      Description: parsedQuestionDetails.description || "",
      Tags: groupedTags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionType>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      setisSubmitting(true);

      if (type === "Edit") {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.Title,
          description: values.Description,
          path: pathname,
        });

        toast({
          title: `Question Edited Successfully`,
          variant: "default",
        });
        router.push(`/question/${parsedQuestionDetails._id}`); // check "/questions/$q.id"
      } else {
        await createQuestion({
          title: values.Title,
          description: values.Description,
          tags: values.Tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });

        toast({
          title: `Question Submitted Successfully`,
          variant: "default",
        });

        // navigate to home Page

        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Question Action failed`,
        variant: "destructive",
      });
    } finally {
      setisSubmitting(false);
    }
  }

  const Handlekeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "Tags") {
      e.preventDefault();
      if (form.getValues("Tags").length === 3) {
        return form.setError("Tags", {
          type: "required",
          message: "Only 3 Tags are allowed",
        });
      }
      // @ts-ignore
      //   console.log(e.target.value);
      const tagInput = e.target as HTMLInputElement;
      const tag = tagInput.value.trim();

      if (tag !== "") {
        if (tag.length > 15) {
          return form.setError("Tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
        if (!field.value.includes(tag)) {
          //   console.log(form.getValues("Tags"));
          form.setValue("Tags", [...field.value, tag]);
          //   console.log(field.value);
          //   console.log(form.getValues("Tags"));
          tagInput.value = "";
          form.clearErrors("Tags");
        } else if (field.value.includes(tag)) {
          return form.setError("Tags", {
            type: "required",
            message: "No duplicate Tags allowed.",
          });
        } else {
          form.trigger();
        }
      }
    }
  };

  const HandleCloseTag = (tag: string, field: any) => {
    // @ts-ignore

    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue("Tags", newTags);
    // console.log(field);
    // console.log(form.getValues("Tags"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-dark400_light800 paragraph-semibold">
                  Question Title
                </span>
                <span className="text-lg font-bold text-red-700"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus light-border-2 text-dark300_light700 paragraph-regular background-light700_dark300 min-h-[56px]"
                  placeholder="Type your Question"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-dark300_light700">
                Write a Question, Imagining you&apos;re asking to another Person
                !{" "}
              </FormDescription>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-dark400_light800 paragraph-semibold">
                  Description
                </span>
                <span className="text-lg font-bold text-red-700"> *</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={`${
                    parsedQuestionDetails.description
                      ? parsedQuestionDetails.description
                      : "Start describing your Question here."
                  }`}
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
                Thoroughly explain your Question, to get good answers.{" "}
              </FormDescription>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {type === "Edit" ? (
                  <span className="text-dark400_light800 paragraph-semibold">
                    Question Tags
                  </span>
                ) : (
                  <>
                    <span className="text-dark400_light800 paragraph-semibold">
                      Add Tags
                    </span>
                    <span className="text-lg font-bold text-red-700"> *</span>
                  </>
                )}
              </FormLabel>
              {type !== "Edit" && (
                <FormControl>
                  <Input
                    className="no-focus light-border-2 text-dark300_light700 paragraph-regular background-light700_dark300 min-h-[56px]"
                    placeholder="Add Tags"
                    onKeyDown={(e) => Handlekeydown(e, field)}
                  />
                </FormControl>
              )}
              <FormDescription className="text-dark300_light700">
                {type !== "Edit" && (
                  <>
                    Add 3 appropriate Tags to your Question. Press Enter for
                    Each Tag.
                    <p className="text-red-400">
                      Tags cannot be Edited, Once Submitted!
                    </p>
                  </>
                )}
              </FormDescription>
              {field.value.length !== 0 && (
                <div>
                  {field.value.map((tag) => (
                    <Badge
                      onClick={(e) => HandleCloseTag(tag, field)}
                      className="background-light700_dark300 subtle-medium text-dark400_light900 m-1 rounded-lg px-4 py-2 uppercase"
                      key={tag}
                    >
                      <span className="">{tag}</span>
                      {type !== "Edit" && (
                        <Image
                          src="/assets/icons/close.svg"
                          alt="close"
                          height={16}
                          width={16}
                          className="ml-1 invert-0 dark:invert"
                        />
                      )}
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          className="primary-gradient"
          type="submit"
        >
          {isSubmitting ? (
            type === "Edit" ? (
              <>Editing...</>
            ) : (
              <>Posting your Question...</>
            )
          ) : type === "Edit" ? (
            <>Edit Question</>
          ) : (
            <>Ask a Question</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
