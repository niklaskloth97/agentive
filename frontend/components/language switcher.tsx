"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 
import { useTranslation } from "react-i18next";

import * as React from "react";

export default function LanguageDropdown() {
    const { i18n } = useTranslation();
    const onLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);     
    }; //change language function
        return (
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 border rounded-md">🌐 Language</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => onLanguageChange("en")}>English</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onLanguageChange("de")}>Deutsch</DropdownMenuItem>  

        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
        