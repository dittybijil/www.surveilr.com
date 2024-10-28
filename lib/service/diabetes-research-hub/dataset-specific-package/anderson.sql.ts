#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-run --allow-sys --allow-ffi
import { sqlPageNB as spn } from "../deps.ts";
import * as pkg from "../package.sql.ts";

export class andersonSqlPages extends spn.TypicalSqlPageNotebook {
  
}

export async function andersonSQL() {
  return await spn.TypicalSqlPageNotebook.SQL(
    new class extends pkg.DRHSqlPages {
      // async myDDL() {
      //   // DDL for CTR3 Anderson (2016) Dataset
      //   return await super.combinedViewDDL();
      // }

      async statelessAndersonSQL() {
        // stateless SQL for CTR3 Anderson (2016) Dataset
        return await spn.TypicalSqlPageNotebook.fetchText(
          import.meta.resolve(
            "../study-specific-stateless/ctr-anderson-stateless.sql",
          ),
        );
      }
    }(),
    ...(await pkg.drhNotebooks()),
  );
}

// this will be used by any callers who want to serve it as a CLI with SDTOUT
if (import.meta.main) {
  console.log((await andersonSQL()).join("\n"));
}