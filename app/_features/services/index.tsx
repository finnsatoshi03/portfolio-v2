import React from "react";

import { SERVICES, PAYMENT_OPTIONS, TERMS } from "@/app/_lib/_const/services";

import { GeneralCard } from "@/app/_components/GeneralCard";
import { ServiceCard } from "./_components/ServiceCard";
import { PaymentCard } from "./_components/PaymentCard";
import { TermsOverview } from "./_components/TermsOverview";
import { ProcessFlow } from "./_components/ProcessFlow";

export default function Services() {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <h2>Our Services</h2>
      </div>
      <div className="flex flex-col h-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Services */}
        {SERVICES.slice(0, 2).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {/* Payment Options */}
        <GeneralCard
          title="Payment Options"
          description="Flexible payment structures designed for different client needs"
          className="row-span-2 flex flex-col"
        >
          <div className="space-y-4 flex-1">
            {PAYMENT_OPTIONS.map((option) => (
              <PaymentCard key={option.id} option={option} />
            ))}
          </div>
        </GeneralCard>

        {/* Terms Overview */}
        <GeneralCard
          title="Terms & Conditions"
          description="Clear and transparent terms for our collaboration"
          className="row-span-2 flex flex-col"
        >
          <TermsOverview terms={TERMS} />
        </GeneralCard>

        {/* Additional Services */}
        {SERVICES.slice(2, 4).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {/* Process Flow */}
        <GeneralCard
          title="Our Process"
          description="From consultation to delivery - our streamlined approach"
          className="col-span-4 flex flex-col"
        >
          <ProcessFlow />
        </GeneralCard>
      </div>
    </div>
  );
}
