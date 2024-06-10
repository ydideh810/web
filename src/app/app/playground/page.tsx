import Playground from "@/components/main/agents/playground/main";
import SvgLogo from "@/components/main/logo";
import Settings from "@/components/main/settings";
import ThemeToggle from "@/components/themeToggle";
import { Badge } from "@/components/ui/badge";
import generateToken from "@/functions/tokens/generate";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro } from "@/scripts/plan";
import { Button } from "@nextui-org/react";
import { AgentData } from "@scoopika/types";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";

interface Props {
  searchParams: {
    id?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const { id } = searchParams;

  const session = (await getServerSession(authOptions)) as Session;
  const pro = isPro(session.user.plan);

  const token = await generateToken();

  if (!token.success) {
    return (
      <div>{"Can't"} load right now. try again later or contact support</div>
    );
  }

  const apiKeys = (
    await db.apikeys.findMany({
      where: {
        userId: session.user.id,
      },
    })
  ).map((k) => k.name);

  const agents = (
    await db.agent.findMany({
      where: {
        userId: session.user.id,
      },
    })
  ).map((a) => JSON.parse(a.payload)) as AgentData[];

  const wantedAgent = agents.filter((a) => a.id === (id || "NONE"))[0];

  return (
    <>
      <Playground
        userId={session.user.id}
        userAvatar={session.user.image}
        agent={wantedAgent}
        agents={agents}
        apiKeys={apiKeys}
        pro={pro}
        token={token.token?.token}
      />
    </>
  );
}
