"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
type IssueForm = z.infer<typeof createIssueSchema>; //to prevent redundancy

const NewIssue = () => {
  const router = useRouter();
  const [error, setError] = useState(""); //State handle error of form
  const { register, control, handleSubmit,formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema), //Integrate react form with zod
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>
            {error} {/*view error state in radix UI */}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            //Try,catch to handle error of axios
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("unExpected Error occurred"); //set error in state
          }
        })}
      >
        <TextField.Root>
          {/* Form Must be use client*/}
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title&&<Text color="red"  as="p">{errors.title.message}</Text>}
        {/*Markdown editor replaces TextArea of radixUI */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
                {errors.description &&<Text color="red" as="p">{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
