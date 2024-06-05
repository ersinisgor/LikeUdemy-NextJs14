"use client";

import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),
});

const NewCoursePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/instructor/courses/${response.data.id}`);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto items-center justify-center flex h-full">
      <div className="space-y-4">
        <h1 className="text-4xl">New Course</h1>
        <p className="text-sm">What would you like to name your course?</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewCoursePage;
