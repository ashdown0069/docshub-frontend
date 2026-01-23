// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { CircleCheck } from "lucide-react";
// import { useMessages, useTranslations } from "next-intl";
// import Link from "next/link";
// import React from "react";
// import SplitText from "./gsap/GsapSplitText";

// export const LandingPrice = () => {
//   const t = useTranslations("LandingPage");
//   const messages = useMessages();
//   //@ts-ignore
//   const priceMessages = messages.LandingPage["Price"];
//   const pricePlanKeys = Object.keys(priceMessages);

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center">
//         <SplitText
//           text={"Choose a plan to back up your files."}
//           className="text-5xl font-bold"
//           delay={100}
//           duration={0.6}
//           ease="power1.out"
//           splitType="lines"
//           from={{ opacity: 0, y: 50 }}
//           to={{ opacity: 1, y: 0 }}
//           threshold={0.1}
//           rootMargin="-100px"
//           textAlign="center"
//         />
//         <div className="mt-3 text-center text-3xl font-bold text-light-100">
//           Start building for free
//         </div>
//       </div>
//       <section className="mt-16 grid grid-cols-1 gap-10 px-12 md:grid-cols-2 lg:grid-cols-3">
//         {pricePlanKeys.map((plan) => {
//           const priceFeatureKeys = Object.keys(priceMessages[plan]).slice(2);

//           return (
//             <Card key={plan} className="border-brand-100 hover:border-point">
//               <CardHeader className="px-8 pt-10">
//                 <CardTitle className="flex gap-3">
//                   <h2 className="h2">{plan.toUpperCase()}</h2>
//                   {plan == "team" && (
//                     <div
//                       className={cn(
//                         "body-3 flex items-center rounded-lg bg-brand-400 px-2 py-1 font-medium text-white",
//                       )}
//                     >
//                       Most Popular
//                     </div>
//                   )}
//                 </CardTitle>
//                 <CardTitle className="flex gap-1">
//                   <h3 className="h3">{t(`Price.${plan}.price`)}</h3>
//                   <CardDescription className="flex items-end">
//                     {t(`Price.${plan}.price`) !== "custom" ? " /month" : ""}
//                   </CardDescription>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="px-8">
//                 <div className="flex w-full justify-center">
//                   <Button
//                     asChild
//                     className="h-12 w-[300px] bg-brand-400 hover:bg-brand-400"
//                   >
//                     <Link href={"/"}>{t(`Price.${plan}.button`)}</Link>
//                   </Button>
//                 </div>
//                 <div className="p-2">
//                   {priceFeatureKeys.map((key, idx) => (
//                     <div key={idx} className="my-3 flex items-center gap-2">
//                       <CircleCheck color="#8addb4" />
//                       <p className="body-2">{t(`Price.${plan}.${key}`)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </section>
//     </>
//   );
// };
