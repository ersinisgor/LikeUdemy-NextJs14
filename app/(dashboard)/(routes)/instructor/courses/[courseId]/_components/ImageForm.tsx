"use client";
import React, { useState } from "react";
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
import { Edit, Undo } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "imageUrl is required.",
  }),
});

interface ImageFormProps {
  initaldata: Course;
  courseId: string;
}

const ImageForm = ({ courseId, initaldata }: ImageFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const toogleEdit = () => {
    setIsEditing(current => !current);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: "Success",
        description: "ImageUrl has been updated",
        variant: "success",
      });

      toogleEdit();

      router.refresh();
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return <div>ImageForm</div>;
};

export default ImageForm;
