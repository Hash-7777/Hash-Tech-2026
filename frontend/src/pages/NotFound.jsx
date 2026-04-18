import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-xs tracking-[0.3em] text-hash-cyan">404</p>
        <h1 className="heading text-5xl mt-4">Signal lost.</h1>
        <p className="mt-4 text-white/60">
          The page you requested doesn't exist in this timeline.
        </p>
        <Link to="/" className="btn-primary mt-10 inline-flex">Return home</Link>
      </div>
    </PageTransition>
  );
}
