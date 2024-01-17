"use client";
import { Button, Callout,TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic"; //use dynamic with Simplemde cause all pages run on server side , and markdown is client so you need to lazy loading it line 16
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof createIssueSchema>; //to prevent redundancy
const SimpleMDE=dynamic(
  ()=>import('react-simplemde-editor'),
  {ssr:false} //don't run this on server 
)
const IssueForm = ({issue}:{issue?:Issue}) => {

  const router = useRouter();
  const [error, setError] = useState(""); //State handle error of form
  const [isSubmitting,setSubmitting]=useState(false)
  const { register, control, handleSubmit,formState:{errors} } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema), //Integrate react form with zod
  });
const onSubmit=
handleSubmit(async (data) => {
  try {
    //Try,catch to handle error of axios
    setSubmitting(true)
    if(issue)
    await axios.patch("/api/issues/"+issue.id,data)
    else{
      await axios.post("/api/issues", data);
    
    }
    router.push("/");
  } catch (error) {
    setSubmitting(false)
    setError("unExpected Error occurred"); //set error in state
  }
})

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
        onSubmit={onSubmit}
      >
        <TextField.Root>
          {/* Form Must be use client*/}
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/*Markdown editor replaces TextArea of radixUI */}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      {/* This is called in Edit Issue and Create New Issue so if there already an Issue update it and send patch , if there are no Issue so submit new form and post it to the server */}
        <Button disabled={isSubmitting}>{issue? 'Update Issue' : 'Submit New Issue' } {isSubmitting&&<Spinner/>}</Button>
        
      </form>
    </div>
  );
};

export default IssueForm;
