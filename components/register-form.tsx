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
  fullName: z.string().min(2, "Erforderlich"),
  email: z.string().email("Ungültige E-Mail"),
  phone: z.string().min(6, "Erforderlich"),
  serviceArea: z.string().min(2, "Erforderlich"),          
  serviceType: z.string().min(2, "Erforderlich"),          
  regionCity: z.string().min(2, "Erforderlich"),           
  website: z.string().url("Ungültige URL").optional().or(z.literal("")),
  companySize: z.enum(["solo","2-5","6-20","21-50","51+"]).describe("Bitte auswählen"),
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
      fullName: "",
      email: "",
      phone: "",
      serviceArea: "",
      serviceType: "",
      regionCity: "",
      website: "",
      companySize: undefined as any,
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
    <Card className={cn("bg-card border-border text-card-foreground shadow-sm", className)}>
      <CardContent className="p-4 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firmenname</FormLabel>
                  <FormControl><Input placeholder="z. B. Hanz Handwerk GmbH" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vor- und Nachname</FormLabel>
                  <FormControl><Input placeholder="Max Mustermann" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail-Adresse</FormLabel>
                    <FormControl><Input type="email" placeholder="sie@firma.de" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefonnummer</FormLabel>
                    <FormControl><Input type="tel" placeholder="+49 ..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="serviceArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arbeitsgebiet</FormLabel>
                  <FormControl><Input placeholder="Berlin, Brandenburg…" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dienstleistungsbereich</FormLabel>
                    <FormControl><Input placeholder="Sanitär, Elektrik, Umzug…" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="regionCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region / Stadt der Tätigkeit</FormLabel>
                    <FormControl><Input placeholder="z. B. Neukölln, Mitte…" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (optional)</FormLabel>
                  <FormControl><Input placeholder="https://…" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firmengröße</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Bitte auswählen…" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="solo">Einzeln</SelectItem>
                        <SelectItem value="2-5">2–5</SelectItem>
                        <SelectItem value="6-20">6–20</SelectItem>
                        <SelectItem value="21-50">21–50</SelectItem>
                        <SelectItem value="51+">51+</SelectItem>
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
                    <FormLabel>Wie haben Sie von uns erfahren?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Bitte auswählen…" /></SelectTrigger>
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
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Jetzt vorregistrieren
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}