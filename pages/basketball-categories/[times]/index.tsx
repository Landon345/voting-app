import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/layout";
import Basketball from "src/components/basketball";
import { valueToObjectRepresentation } from "@apollo/client/utilities";

function Index() {
  return <Layout main={<Basketball></Basketball>} />;
}

export default Index;
