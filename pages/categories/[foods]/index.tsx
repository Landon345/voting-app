import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/layout";
import Foods from "src/components/foods";
import { valueToObjectRepresentation } from "@apollo/client/utilities";

function Food() {
  return <Layout main={<Foods />} />;
}

export default Food;
