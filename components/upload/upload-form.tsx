"use client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { generateBlogPostAction, transcribeUploadedFile } from "@/actions/upload-action";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must not exceed 20MB",
    })
    .refine(
      (file) =>
        file.type.startsWith("audio/") || file.type.startsWith("video/"),
      { message: "File must be an audio or a video file" }
    ),
});

const UploadForm = () => {
  const { toast } = useToast();
  const { startUpload } = useUploadThing("videoOrAudioUploader", {
    onClientUploadComplete: () => {
      toast({ title: "uploaded successfully!" });
    },
    onUploadError: (err) => {
      console.error("Error occurred during upload", err);
    },
    onUploadBegin: () => {
      console.log("Upload has begun");
      toast({ title: "Upload has begun 🚀!" });
    },
  });

  // Handle the form submission
  const handleTransribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.target as HTMLFormElement;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      toast({
        title: "❌ No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Validate the file using zod schema
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.log(
        "Validation failed",
        validatedFields.error.flatten().fieldErrors
      );
      toast({
        title: "❌ Something went wrong",
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file",
        variant: "destructive",
      });
      return;
    }

    console.log("Uploading started: ", [file]);

    try {
      const resp = await startUpload([file]);
      console.log("Upload response: ", resp);

      if (!resp) {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Transcription is in progress",
        description: "Hang tight! Our digital wizards are sprinkling magic dust on your file",
      });

      const result = await transcribeUploadedFile(resp);
      const data = result && result?.data != null ? result.data : null;
      const message =
        result && result?.message != null ? result.message : null;

      if (!result || (!data && !message)) {
        toast({
          title: "An unexpected error occurred",
          description:
            "An error occurred during transcription. Please try again.",
        });
      }

      if (data) {
        toast({
          title: "🤖 Generating AI blog post...",
          description: "Please wait while we generate your blog post.",
        });

        await generateBlogPostAction({
          transcriptions: data.transcriptions,
          userId: data.userId,
        });

        toast({
          title: "🎉 Woohoo! Your AI blog is created! 🎊",
          description:
            "Time to put on your editor hat, Click the post and edit it!",
        });
      }
    } catch (error) {
      console.error("Upload failed: ", error);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleTransribe}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="file"
          name="file" // Add name attribute to file input
          type="file"
          accept="audio/*,video/*"
          required
        />
        <Button className="bg-purple-600" type="submit">
          Transcribe
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
