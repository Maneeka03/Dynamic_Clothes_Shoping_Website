"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    title: "Summer Sale",
    description: "Up to 50% off on summer collection",
    badge: "Limited Time",
  },
  {
    title: "New Arrivals",
    description: "Check out our latest fashion items",
    badge: "Just In",
  },
  {
    title: "Free Shipping",
    description: "On all orders over $100",
    badge: "Offer",
  },
];

export function OfferCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-sm mx-auto"
    >
      <CarouselContent>
        {offers.map((offer, index) => (
          <CarouselItem key={index}>
            <Card className="bg-orange-50 border-orange-100">
              <CardContent className="flex flex-col items-start justify-center p-6">
                <Badge
                  variant="secondary"
                  className="mb-2 bg-orange-100 text-orange-700"
                >
                  {offer.badge}
                </Badge>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-600">{offer.description}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
