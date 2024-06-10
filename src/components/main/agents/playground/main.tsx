"use client";

import { Input } from "@/components/ui/input";
import newApiKey from "@/functions/apikeys/new";
import tryRequest from "@/scripts/tryRequest";
import { Button } from "@nextui-org/react";
import { AgentData, RawEngines } from "@scoopika/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaLock } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PlaygroundChat from "./chat";
import AppHead from "../../head";
import Empty from "../../empty";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { RiVoiceprintFill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  agent: AgentData;
  agents: AgentData[];
  apiKeys: string[];
  pro: boolean;
  token: string;
  userId: string;
  userAvatar?: string | null;
}

export default function Playground({
  agent,
  agents,
  apiKeys,
  userAvatar,
  pro,
  token,
  userId,
}: Props) {
  const [apiKey, setApiKey] = useState<string | undefined>(
    agent
      ? apiKeys.filter((k) => k === agent.prompts[0]?.llm_client)[0]
      : undefined
  );
  const [apiKeyInput, setApiKeyInput] = useState<string | undefined>(undefined);
  const [newKeyLoading, setNewKeyLoading] = useState<boolean>(false);
  const [engines, setEngines] = useState<RawEngines>({});
  const [back, setBack] = useState<boolean>(false);

  useEffect(() => {
    const update = async () => {
      await fetch(`https://scoopika-run-35.deno.dev/add-client/${userId}`, {
        method: "POST",
        body: JSON.stringify({ token, engines }),
      });
      await fetch(`https://scoopika-run-35.deno.dev/add-agent/${agent.id}`, {
        method: "POST",
        body: JSON.stringify({ agent }),
      });
    };
    if (agent) {
      update();
      setApiKey(apiKeys.filter((k) => k === agent.prompts[0]?.llm_client)[0]);
    }
  }, [engines, agent]);

  const addThisTime = () => {
    if (newKeyLoading) return;

    if (!apiKeyInput || apiKeyInput.length < 1) {
      return toast.error("Enter API key to add");
    }

    setEngines({ [agent.prompts[0].llm_client]: apiKeyInput });
    setApiKey(apiKeyInput);
  };

  const saveKey = async () => {
    if (newKeyLoading) return;

    if (!apiKeyInput || apiKeyInput.length < 1) {
      return toast.error("Enter API key to save it");
    }

    setNewKeyLoading(true);
    tryRequest<{ success: true; id: string }>({
      loading: "Saving API key",
      success: "Saved key successfully",
      error: "Can't save API key",
      func: async () => {
        const res = await newApiKey(apiKeyInput, agent.prompts[0].llm_client);
        if (!res || !res.success) {
          throw new Error("Error adding API key!");
        }

        return res;
      },
      end: (s) => {
        if (s?.success) {
          setApiKey(apiKeyInput);
        }

        setNewKeyLoading(false);
      },
    });
  };

  if (!agent) {
    return (
      <>
        <AppHead
          title="Playground"
          description="Test your agents and chat with them (supports both text & voice chat)"
        />
        {agents.length > 0 ? (
          <div>Pick an agent to start talking with:</div>
        ) : (
          <Empty
            icon={<RiRobot2Fill />}
            title="Create your first agent"
            description="Create an agent and test it in the playground totally for free. navigate to the agents page, create an agent in few seconds, then come back here to talk with it"
          />
        )}
        <div className="w-full flex flex-col items-center justify-center p-6 pt-0">
          {agents.map((agent) => (
            <Link
              href={`/app/playground?id=${agent.id}`}
              key={`pick-agentitem-${agent.id}`}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-accent/30 transition-all w-full mb-3`}
            >
              {agent.avatar ? (
                <img
                  src={agent.avatar}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent">
                  <RiRobot2Fill />
                </div>
              )}
              <div className="flex flex-col w-full">
                <div className="font-semibold flex items-center gap-2">
                  {agent.name}
                  <HiOutlineChatBubbleBottomCenterText className="opacity-80" />
                  <RiVoiceprintFill className="opacity-80" />
                </div>
                <div className="flex items-center gap-1 text-xs opacity-70">
                  {agent.description}
                </div>
              </div>
              <FaChevronRight />
              <div className=""></div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  if (!apiKey) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <h3 className="">Add API key for {agent.prompts[0].llm_client}</h3>
          <div className="text-xs opacity-80">
            You need to add your API key for the provider this agent is using,
            you can {'"add just this time"'} and the key {"won't"} be saved and
            deleted once you leave this page, or {'"add to my account"'} so{" "}
            {"it's"} saved to your account and always used when you run your
            agent here or from your application.
          </div>
          <Input
            type="password"
            placeholder="Add API Key..."
            className="mt-2"
            defaultValue={apiKeyInput}
            onInput={(e) => {
              const value = e?.currentTarget?.value;
              setApiKeyInput(value);
            }}
          />
          <div className="w-full flex items-center flex-col lg:flex-row gap-3">
            <Button
              size="sm"
              variant="flat"
              className="w-full font-semibold"
              onPress={() => addThisTime()}
              disabled={newKeyLoading}
            >
              Add just this time
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="w-full font-semibold"
              isLoading={newKeyLoading}
              onPress={() => saveKey()}
            >
              Add to my account
            </Button>
          </div>
          <div className="mt-4 text-sm flex items-center gap-1 opacity-70">
            <FaLock />
            API keys are encrypted
          </div>
          <DropdownMenu open={back} onOpenChange={setBack}>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="flat"
                className="font-semibold"
                startContent={<FaChevronLeft />}
                onPress={() => setBack(true)}
              >
                Go back
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-1">
              <Button
                size="sm"
                variant="light"
                startContent={<FaChevronLeft />}
                className="justify-start"
                as={Link}
                href="/app/playground"
              >
                Chat with another agent
              </Button>
              <Button
                size="sm"
                variant="light"
                startContent={<RiRobot2Fill />}
                className="justify-start"
                as={Link}
                href={`/app/agents/${agent.id}`}
              >
                Go to {agent.name} page
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <PlaygroundChat
      userId={userId}
      userAvatar={userAvatar}
      agent={agent}
      token={token}
      engines={engines}
      setEngines={setEngines}
      pro={pro}
    />
  );
}
