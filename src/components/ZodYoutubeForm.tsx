import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),
  channel: z.string().nonempty("Channel is required"),
});

// let renderCount;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const ZodYoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  //   renderCount++;
  return (
    <div>
      <h1>ZodYoutube form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // disabled
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              //HTML validation
              // pattern: {
              //     value:
              //         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
              //     message: "Invalid email format",
              // },
              //Custom validation
              // validate: {
              //     notAdmin: (fieldValue) => {
              //         return (
              //             fieldValue !== "admin@example.com" ||
              //             "Enter a different email address"
              //         );
              //     },
              //     notBlackListed: (fieldValue) => {
              //         return (
              // !fieldValue.endsWith("baddomain.com") ||
              //             "This domain is not supported"
              //         );
              //   },
              //Async email validation (to know if the email already exist or not)
              //     emailAvailable: async (fieldValue) => {
              //         const response = await fetch(
              //             `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
              //         );
              //         const data = await response.json();
              //         return data.length == 0 || "Email already exists";
              //     },
              // },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
