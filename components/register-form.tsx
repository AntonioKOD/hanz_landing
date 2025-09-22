/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const schema = z.object({
  companyName: z.string().min(2, "Erforderlich"),
  firstName: z.string().min(2, "Erforderlich"),
  lastName: z.string().min(2, "Erforderlich"),
  email: z.string().email("Ungültige E-Mail"),
  website: z.string().url("Ungültige URL").optional().or(z.literal("")),
  postalCode: z.string().min(2, "Erforderlich"),
  serviceType: z.enum(["sanitär","elektrik","umzug","reinigung","garten","sonstiges"]).describe("Bitte auswählen"),
  heardFrom: z.enum(["google","tiktok","instagram","friend","reddit","other"]).describe("Bitte auswählen"),
});

type FormValues = z.infer<typeof schema>;

export function ProviderPreRegisterForm({
  className,
}: { className?: string }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      firstName: "",
      lastName: "",
      email: "",
      website: "",
      postalCode: "",
      serviceType: undefined as any,
      heardFrom: undefined as any,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("https://sheetdb.io/api/v1/oz6nnwrxr54cr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
  });
    if (!res.ok) {
        console.log("Error submitting form:", res.statusText);
      form.setError("companyName", { message: "Etwas ist schiefgelaufen. Bitte erneut versuchen." });
      
      return;
    }
    form.reset();
    alert("Danke! Wir melden uns bald bei Ihnen.");
  };

  return (
    <div>
    <Card className={cn("bg-card border-border text-card-foreground shadow-sm", className)}>
      <div className="p-3 sm:p-4 text-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Sichere dir deinen Platz auf Hanz!</h1>
      <p className="text-muted-foreground text-sm sm:text-base">Sei bei den Ersten, die Aufträge erhalten! Und zahle keinerlei Gebühren in den ersten 3 Monaten ab Start von Hanz. Garantiert!</p>
      </div>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firmenname</FormLabel>
                  <FormControl><Input placeholder="z. B. Hanz Handwerk GmbH" {...field} className="border-amber-200 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vorname</FormLabel>
                    <FormControl><Input placeholder="Max" {...field} className="border-amber-200 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="Mustermann" {...field} className="border-amber-200 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail-Adresse</FormLabel>
                  <FormControl><Input type="email" placeholder="sie@firma.de" {...field} className="border-amber-200 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl><Input placeholder="https://…" {...field} className="border-amber-200 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PLZ deines Unternehmens bzw. deines Wohnorts</FormLabel>
                  <FormControl><Input placeholder="12345" {...field} className="border-amber-200 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dienstleistung (Mehrfachauswahl möglich)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-amber-200/60 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out"><SelectValue placeholder="Bitte auswählen…" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sanitär">Sanitär</SelectItem>
                      <SelectItem value="elektrik">Elektrik</SelectItem>
                      <SelectItem value="umzug">Umzug</SelectItem>
                      <SelectItem value="reinigung">Reinigung</SelectItem>
                      <SelectItem value="garten">Garten</SelectItem>
                      <SelectItem value="sonstiges">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heardFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wie hast du von Hanz erfahren?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-amber-200/60 border-4 focus:border-amber-300 focus:ring-0 focus-visible:border-amber-300 focus-visible:ring-0 transition-all duration-300 ease-in-out"><SelectValue placeholder="Bitte auswählen…" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="friend">Freunde / Empfehlung</SelectItem>
                      <SelectItem value="reddit">Reddit</SelectItem>
                      <SelectItem value="other">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base py-3 sm:py-4"
            >
              Jetzt kostenlos voranmelden!
            </Button>
            
            <p className="text-xs sm:text-sm text-muted-foreground text-center mt-4 px-2">
              Mit Absenden deiner Daten stimmst du den{" "}
              <a href="#" className="text-primary hover:underline">AGB</a>{" "}
              und{" "}
              <a href="#" className="text-primary hover:underline">Datenschutzbestimmungen</a>{" "}
              von Hanz zu. Bei Hanz bist du sicher: Wir behandeln deine Daten 100% vertraulich.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  );
}