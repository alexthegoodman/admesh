import * as React from "react";

import styles from "./AuthForm.module.scss";

import { AuthFormProps } from "./AuthForm.d";
import Helpers from "@/helpers/Helpers";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";
import request from "graphql-request";
import { fullDomain, graphqlUrl } from "@/defs/urls";
import { authenticateQuery, registerMutation } from "@/graphql/user";
import { DateTime } from "luxon";
import { CookieSettings } from "@/defs/CookieSettings";
import SLink from "../SLink/SLink";
import FormMessage from "../FormMessage/FormMessage";
import FormInput from "../FormInput/FormInput";
import { Button, Flex, View } from "@adobe/react-spectrum";

const AuthForm: React.FC<AuthFormProps> = ({
  onClick = (e) => console.info("Click AuthForm"),
  type = "login",
}) => {
  // const { t } = useTranslation();
  const helpers = new Helpers();
  // const mixpanel = new MixpanelBrowser();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["amUserToken"]);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);

    setSubmitLoading(true);

    try {
      var userIdData, token;

      const authorizationHeader = helpers.createAuthHeader(
        `${data.email}:${data.password}`
      );

      if (type === "login") {
        // mixpanel.track("Sign In - Attempt", { email: data.email });

        userIdData = (await request(
          graphqlUrl,
          authenticateQuery,
          {},
          {
            Authorization: authorizationHeader,
          }
        )) as any;

        token = userIdData.authenticate;
      } else if (type === "signup") {
        // mixpanel.track("Sign Up - Attempt", { email: data.email });

        userIdData = (await request(
          graphqlUrl,
          registerMutation,
          {},
          {
            Authorization: authorizationHeader,
          }
        )) as any;

        token = userIdData.registerUser;

        // const ReactPixel = require("react-facebook-pixel");
        // ReactPixel.default.trackCustom("SignUp", {});
      }

      const expireCookie = DateTime.now()
        .plus({ weeks: 1 })
        .endOf("day")
        .toUTC()
        .toJSDate();

      console.info(
        "token",
        token,
        fullDomain,
        expireCookie,
        process.env.NODE_ENV,
        process.env.NEXT_PUBLIC_APP_ENV
      );

      setCookie("amUserToken", token, {
        ...CookieSettings,
        expires: expireCookie,
      });

      console.info("cookie set with token");

      // try {
      //   LogRocket.identify(data.email);
      // } catch (error) {
      //   console.error("LogRocket error", error);
      // }

      console.info("redirect to browse");

      // cleanup and
      setFormErrorMessage("");
      router.push("/projects");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.response?.errors[0].message;
      setFormErrorMessage(errorMessage);
      setSubmitLoading(false);
    }
  };

  const onError = (error: any) => console.error(error);

  const headline = type === "login" ? "Log In" : "Sign Up";
  let submitButtonText = type === "login" ? "Log In" : "Sign Up";

  if (submitLoading) submitButtonText = "Loading...";

  return (
    <View width="size-3600" padding="size-500" backgroundColor="static-white">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="size-100"
      >
        <h1>{headline}</h1>
        <FormProvider {...methods}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Flex direction="column" gap="size-100">
              <FormMessage type="error" message={formErrorMessage} />

              <FormInput
                type="email"
                name="email"
                label={"Email"}
                register={register}
                errors={errors}
                validation={{
                  required: "Email Required",
                }}
              />

              <FormInput
                type="password"
                name="password"
                label={"Password"}
                register={register}
                errors={errors}
                validation={{
                  required: "Password Required",
                }}
              />

              <Button type="submit" variant="cta" isDisabled={submitLoading}>
                {submitButtonText}
              </Button>
            </Flex>
          </form>
        </FormProvider>
        <div className={styles.addtActions}>
          {type === "login" ? (
            <span>
              Or you may <SLink href="/signup">Sign Up</SLink> instead
            </span>
          ) : (
            <span>
              Or you may <SLink href="/login">Log In</SLink> instead
            </span>
          )}
        </div>
      </Flex>
    </View>
  );
};

export default AuthForm;
