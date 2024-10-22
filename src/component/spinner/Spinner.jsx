import React from "react";

export default function Spinner() {
  return (
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-text-light-subtle spinner-border-sm fs-1" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
