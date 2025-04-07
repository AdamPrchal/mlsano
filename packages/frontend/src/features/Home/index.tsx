import { Button, Flex, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { RecipeList } from "~/components/RecipeList";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../../backend/src/router";

export const Home = () => {
  const { t } = useTranslation();
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });

  const hello = async () => {
    const result = await client.hello.query("Hono");
    console.log(result);
    return result;
  };

  return (
    <>
      <Title order={1}>{t("home")}</Title>
      <Button onClick={hello}>Hello</Button>
    </>
  );
};
