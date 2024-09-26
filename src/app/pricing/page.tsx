import { authOptions } from "@/lib/auth";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import CheckItem from "@/components/checkItem";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaBrain, FaDatabase } from "react-icons/fa6";
import { RiRobot2Fill, RiVoiceprintLine } from "react-icons/ri";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineStream } from "react-icons/md";
import { MdVolumeUp } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { UpgradeButton } from "@/components/main/upgradeButton";
import AboutFeatureDialog from "@/components/main/aboutFeature";
import aboutFeatures from "@/scripts/aboutFeatures";
import { Metadata } from "next";
import GridSmallBackground from "@/components/backgrounds/grid";
import ScrollArrow from "@/components/landing/scrollArrow";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { IconBooks, IconBrain, IconCircleDashedCheck, IconDatabase, IconDatabaseImport, IconForms, IconMail, IconMessage, IconMicrophone, IconPlayerPlay, IconSend, IconTimeline, IconWaveSawTool, IconWaveSine, IconZoomExclamation } from "@tabler/icons-react";

interface Feature {
  id?: string;
  title: string;
  description: string;
  free: string;
  basic: string;
  scale: string;
  icon?: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start for free with Scoopika ",
};

const Cell = ({ feature }: { feature: Feature }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center border-1 border-t-0 md:h-36">
      <div className="w-full p-3 md:border-r-1 flex flex-col gap-2 h-full justify-center">
        {feature.icon && feature.icon}
        <div className="font-semibold text-sm flex items-center gap-2">
          {feature.title}
          {feature.id && (
            <AboutFeatureDialog
              name={feature.title}
              info={aboutFeatures[feature.id as any] || ""}
            />
          )}
        </div>
        <div className="text-xs opacity-80">{feature.description}</div>
      </div>
      <div className="w-full p-3 text-sm md:text-center md:border-r-1 h-full flex items-center md:justify-center gap-2">
        <div className="md:hidden opacity-80 font-semibold">Free: </div>
        <div>{feature.free}</div>
      </div>
      <div className="w-full p-3 text-sm md:text-center md:border-r-1 h-full flex items-center md:justify-center gap-2">
        <div className="md:hidden opacity-80 font-semibold">Basic: </div>
        <div>{feature.basic}</div>
      </div>
      <div className="w-full p-3 text-sm md:text-center h-full flex items-center md:justify-center gap-2">
        <div className="md:hidden opacity-80 font-semibold">Scale: </div>
        <div>{feature.scale}</div>
      </div>
    </div>
  );
};

export const Plans = () => {
  return (
    <>
      <div className="w-full overflow-hidden border rounded-2xl p-6 h-full flex flex-col">
        <div
          className="max-w-max p-1 pl-3 pr-3 border bg-accent/30 rounded-md text-green-400 border-green-400/20 text-xs mb-4"
          style={{
            boxShadow: "0px 0px 130px 10px #4ade80",
          }}
        >
          HOBBY
        </div>
        <div className="text-xs opacity-80 mt-2">
          For developers building their impressive LLM-powered side projects &
          apps
        </div>
        <div className="mt-6 text-2xl font-semibold">Free</div>
        <div className="h-full"></div>
        <div className="mt-4 flex flex-col justify-end gap-4">
          <CheckItem title="Unlimited AI agents runs" className="w-full" />
          <CheckItem title="Connect your LLMs providers" className="w-full" />
          <CheckItem title="Add tools to agents" className="w-full" />
          <CheckItem title="Real-time streaming" className="w-full" />
          <CheckItem title="LLM output validation" className="w-full" />
          <CheckItem title="Full type-safety" className="w-full" />
          <CheckItem title="Smart error recovery" className="w-full" />
        </div>
      </div>
      <div className="w-full bg-accent/20 overflow-hidden border rounded-2xl p-6 h-full flex flex-col">
        <div
          className="max-w-max p-1 pl-3 pr-3 border bg-accent/30 rounded-md text-violet-400 border-violet-400/20 text-xs mb-4"
          style={{
            boxShadow: "0px 0px 130px 10px #a78bfa",
          }}
        >
          PRO
        </div>
        <div className="text-xs opacity-80 mt-2">
          For developers & small teams that need voice responses, long-term
          memory, or agents with custom knowledge
        </div>
        <div className="flex items-center gap-2 mt-6">
          <div className="text-2xl font-semibold">$25</div>
          <div className="opacity-70 text-sm">/month</div>
        </div>
        <div className="h-full"></div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="text-xs opacity-70">
            Everything in the free plan, plus:
          </div>
          <CheckItem
            title="Serverless managed long-term memory"
            className="w-full"
          />
          <CheckItem
            title="Expand agents knowledge from files & websites"
            className="w-full"
          />
          <CheckItem title="Real-time voice responses" className="w-full" />
          <CheckItem title="Higher rate limits" className="w-full" />
          <CheckItem title="Faster audio files processing" className="w-full" />
        </div>
      </div>
      <div className="w-full overflow-hidden border rounded-2xl p-6 h-full flex flex-col">
        <div
          className="max-w-max p-1 pl-3 pr-3 border bg-accent/30 rounded-md text-indigo-400 border-indigo-400/20 text-xs mb-4"
          style={{
            boxShadow: "0px 0px 130px 10px #818cf8",
          }}
        >
          SCALE
        </div>
        <div className="text-xs opacity-80 mt-2">
          For bigger teams that need higher rate limits, requests, volumes, and
          memory storage
        </div>
        <div className="flex items-center gap-2 mt-6">
          <div className="text-2xl font-semibold">$70</div>
          <div className="opacity-70 text-sm">/month</div>
        </div>
        <div className="h-full"></div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="text-xs opacity-70">
            Everything in the Basic plan, plus:
          </div>
          <CheckItem
            title="Higher memory storage & requests"
            className="w-full"
          />
          <CheckItem
            title="Higher knowledge monthly requests"
            className="w-full"
          />
          <CheckItem
            title="More voice responses characters"
            className="w-full"
          />
          <CheckItem
            title="Even higher rate limits (almost none)"
            className="w-full"
          />
          <CheckItem title="Direct support and assistant" className="w-full" />
        </div>
      </div>
    </>
  );
};

export const Offer = () => {
  return (
    <>
      <div className="w-full overflow-hidden bg-accent/20 border rounded-2xl h-full flex">
        <div className="w-full p-10 flex flex-col">
          <h3 className="text-2xl font-semibold">Special Offer</h3>
          <div className="opacity-80 mt-2 mb-10">
            {"We'll"} build your full AI feature in a week, you
            name it, we build it!
          </div>
          <div className="h-full"></div>
          <div className="mt-4 flex flex-col gap-4">
            <div className="text-xs opacity-70">
              You get 3 months of the scale plan, plus:
            </div>
            <CheckItem
              title="Build any AI feature you want with Niddam-Hub"
              className="w-full"
            />
            <CheckItem
              title="We handle both server-side & client-side development"
              className="w-full"
            />
            <CheckItem
              title="UI/UX is on us, based on your product design"
              className="w-full"
            />
            <CheckItem
              title="Need full app? We got you too!"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full w-full md:min-w-[30%] md:max-w-[30%] rounded-inherit border-t-1 md:border-t-0 md:border-l-1 bg-accent/20 flex flex-col items-center justify-center p-6">
          <div
            className="max-w-max p-1 pl-3 pr-3 border bg-accent/30 rounded-md text-rose-400 border-rose-400/20 text-xs mb-3 rotate-[-10deg]"
            style={{
              boxShadow: "0px 0px 130px 10px #fb7185",
            }}
          >
            LIMITED DEAL
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-semibold">$750</div>
          </div>
          <Button
            as={Link}
            href="mailto:yonis@niddam.ai"
            size="sm"
            color="primary"
            className="font-semibold mt-6 w-full"
          >
            Contact us
          </Button>
          <div className="text-xs opacity-70 mt-2">
            Limited to only 10 clients, get your spot now!
          </div>
        </div>
      </div>
    </>
  );
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  const mainFeatures = {
    free: [
      {
        text: "Unlimited agents runs",
        icon: <IconPlayerPlay size={18} />,
      },
      {
        text: "Multimodal inputs (slow audio processing)",
        icon: <IconForms size={18} />,
      },
      {
        text: "Real-time streaming",
        icon: <IconSend size={18} />,
      },
      {
        text: "Auto errors recovery",
        icon: <IconZoomExclamation size={18} />,
      },
      {
        text: "LLM output validation",
        icon: <IconCircleDashedCheck size={18} />,
      },
    ],
    basic: [
      {
        text: "AI agents voice responses",
        icon: <IconWaveSawTool size={18} />,
      },
      {
        text: "Persistent conversations memory",
        icon: <IconDatabase size={18} />,
      },
      {
        text: "Expand LLMs knowledge",
        icon: <IconBooks size={18} />,
      },
      {
        text: "Fast audio inputs processing",
        icon: <IconMicrophone size={18} />,
      },
      {
        text: "Email support",
        icon: <IconMail size={18} />,
      },
    ],
    scale: [
      {
        text: "Faster voice responses generation",
        icon: <IconWaveSawTool size={18} />,
      },
      {
        text: "Higher memory stores storage",
        icon: <IconDatabaseImport size={18} />,
      },
      {
        text: "More knowledge requests",
        icon: <IconTimeline size={18} />,
      },
      {
        text: "Higher rate limits for everything",
        icon: <IconWaveSine size={18} />,
      },
      {
        text: "Direct support",
        icon: <IconMessage size={18} />,
      },
    ],
  };

  const features: Feature[] = [
    {
      id: "store",
      title: "Memory",
      description: "Chat sessions with users (messages history or memory)",
      free: "In-memory store (not persistent)",
      basic: "Serverless managed memory (1 region)",
      scale: "Serverless managed memory (replicated to 4 regions)",
    },
    {
      id: "store_read",
      title: "History store reads",
      description:
        "Each time you read a session info or messages from the serverless store (4Kb = 1 operation)",
      free: "---",
      basic: "1M / month",
      scale: "4M / month",
    },
    {
      id: "store_write",
      title: "History store writes",
      description:
        "Each time you new session is created or an agent is executed with history enabled to save the chat messages (1Kb = 1 operation)",
      free: "---",
      basic: "500K / month",
      scale: "2M / month",
    },
    {
      id: "speech",
      title: "Speech Characters",
      description: "When using the agent speech (agent audio response)",
      free: "50 / month",
      basic: "100K / month",
      scale: "1.2M / month",
    },
    {
      id: "knowledge",
      title: "Knowledge requests",
      description:
        "If using custom knowledge, with each run we feth info relevant data from a vector database using RAG (this is cached and cache doesn't count to usage)",
      free: "---",
      basic: "300K / month",
      scale: "1.5M / month",
    },
    {
      title: "Image inputs",
      description: "Supported only with LLMs that support vision",
      free: "Unlimited",
      basic: "Unlimited",
      scale: "Unlimited",
    },
    {
      id: "listen",
      title: "Audio inputs",
      description:
        "You can input audio into your agent runs. fast is 2s average latency & slow is ~10s. If limit for fast processing is reached it falls back to slow mode till next month",
      free: "Unlimited slow",
      basic: "500mins fast & unlimited slow",
      scale: "1000mins fast & unlimited slow",
    },
  ];

  const faqs: { title: string; description: string }[] = [
    {
      title: "What can I do with the free plan?",
      description:
        "You can connect any LLM providers, AI agents for text generation and JSON data generation. Handle multimodal inputs with built-in errors recovery and start building LLM-powered application, but with temp conversations memory or expanding the model's knowledge",
    },
    {
      title: "What can I do with the basic plan?",
      description:
        "You can generate voice responses in real-time, have faster multimodal inputs processing, long-term persistent conversations history, and expand model's knowledge from PDFs and websites.",
    },
    {
      title: "What can I do with the scale plan?",
      description:
        "Build any LLM-powered application on a high scale, with much higher rate limits",
    },
    {
      title: "How LLM costs are handled?",
      description:
        "You connect LLM providers from your code, and Scoopika doesn't have anything to do with your LLMs costs. Scoopika will not intoduce extra costs or send extra tokens to the LLMs",
    },
    {
      title: "Can I cancel my plan at anytime?",
      description:
        "Yes, you can cancel your plan at anytime. Once you cancel a plan It won't be renewed in the next month unless you resume it.",
    },
    {
      title: "How history sessions are stored in the Basic & Scale plan?",
      description:
        "In the paid plans you can create a Serverless managed memory store and pass its ID to your scoopika setup and it will be used for persistent chat sessions.",
    },
    {
      title: "What happens once my limit is reached?",
      description:
        "Only the feature that you reached the limit for will stop working. for example, if you reach the limit for the speech characters, your agents will keep working with text-based communication until the next month. another example is that you reached the limit for the knowledge requests, also your agents will keep working but without access to the custom knowledge until the next month.",
    },
    {
      title: "When does my plan renew?",
      description:
        "Your plan renews based on when you subscribed to it (billing cycle). though notice that the available resources or limits are reset once every month (on 1st). so even if you subscrib on 29th of May, your resources will get renewed on 1st of June.",
    },
    {
      title: "Need help or higher limits?",
      description:
        "Feel free to contact us on team@scoopika.com whenever you want. we're always here to help!",
    },
  ];

  return (
    <>
      <Navbar session={session} active="Pricing" />
      <div className="w-full">
        <div className="w-full flex flex-col justify-center">
          <AuroraBackground>
            <GridSmallBackground className="w-full flex flex-col items-center pt-24 md:pt-36 lg:pt-56 min-h-screen">
              <div
                style={{
                  textShadow: "0px 2px 15px rgba(255, 255, 255, .5)",
                }}
                className="flex items-center gap-2 text-sm mb-4 font-semibold"
              >
                Pricing
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-5xl mb-4 text-center">
                Start building AI apps today
                <br />
                scale effortlessly
              </h1>

              <p className="text-sm lg:text-base opacity-80 mt-4 text-center mb-12">
                Open source. Free to use. Pay only for premium features.
              </p>

              <ScrollArrow />
            </GridSmallBackground>
          </AuroraBackground>

          <div
            className="w-full flex flex-col items-center min-h-max pt-24"
            id="pricing"
          >
            <div className="w-[90%] flex flex-col lg:flex-row lg:items-center gap-10 lg:h-[30rem]">
              <Plans />
            </div>
            <div className="w-[90%] flex flex-col lg:flex-row lg:items-center gap-10 mt-10">
              <Offer />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center lg:p-12 mt-48">
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
            {"Let's"} break it down
          </div>
          <div className="w-full p-6">
            <div className="w-full border-1 border-b-1 flex flex-col lg:flex-row">
              <div className="w-full flex flex-col">
                <div className="p-8 flex flex-col gap-3 w-full border-r-1 border-t-1">
                  <h3 className="font-semibold mb-4">Hobby - Free</h3>
                  <div className="text-xs opacity-70 mb-1">
                    Get started with:
                  </div>
                  {mainFeatures["free"].map((feature, index) => (
                    <div
                      key={`mainhobbyfeature-${index}`}
                      className="text-sm opacity-70 flex items-center gap-2"
                    >
                      {feature.icon}
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col">
                <div className="p-8 flex flex-col gap-3 w-full border-r-1 border-t-1">
                  <h3 className="font-semibold mb-4">Basic - $25/month</h3>
                  <div className="text-xs opacity-70 mb-1">
                    Everything in Hobby, plus:
                  </div>
                  {mainFeatures["basic"].map((feature, index) => (
                    <div
                      key={`mainbasicfeature-${index}`}
                      className="text-sm opacity-70 flex items-center gap-2"
                    >
                      {feature.icon}
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col">
                <div className="p-8 flex flex-col gap-3 w-full bg-accent/30 border-t-1">
                  <h3 className="font-semibold mb-4">Scale - $70/month</h3>
                  <div className="text-xs opacity-70 mb-1">
                    Everything in Basic, plus:
                  </div>
                  {mainFeatures["scale"].map((feature, index) => (
                    <div
                      key={`mainscalefeature-${index}`}
                      className="text-sm opacity-70 flex items-center gap-2"
                    >
                      {feature.icon}
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-2 border-r-1 border-l-1 border-b-1"></div>

            <div className="border-r-1 border-l-1 border-b-1 flex items-center hidden md:flex">
              <div className="p-4 w-full border-r-1 border-dashed font-semibold md:text-center">
                Features
              </div>
              <div className="p-4 w-full border-r-1 border-dashed font-semibold md:text-center">
                Hobby
              </div>
              <div className="p-4 w-full border-r-1 border-dashed font-semibold md:text-center">
                Basic
              </div>
              <div className="p-4 w-full font-semibold md:text-center">
                Scale
              </div>
            </div>

            {features.map((feature, index) => (
              <Cell key={`featurerow-${index}`} feature={feature} />
            ))}
          </div>
        </div>

        <div className="lg:p-16">
          <Accordion type="single" collapsible>
            {faqs.map((f, index) => (
              <AccordionItem
                key={`pricingfaq-${index}`}
                value={`faqitem-${index}`}
              >
                <AccordionTrigger>{f.title}</AccordionTrigger>
                <AccordionContent>{f.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
