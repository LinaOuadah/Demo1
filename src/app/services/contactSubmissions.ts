export interface SubmissionConfirmation {
  reference?: string;
}

type SubmissionKind = "inquiries" | "registration-requests";

export async function submitContactRequest(
  kind: SubmissionKind,
  payload: Record<string, string>,
): Promise<SubmissionConfirmation> {
  let response: Response;

  try {
    response = await fetch(`/api/contact/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "The submission service could not be reached. Your details were not sent or stored.",
    );
  }

  if (!response.ok) {
    throw new Error(
      `The submission service is unavailable (HTTP ${response.status}). Your details were not sent or stored.`,
    );
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error(
      "The server did not return a valid confirmation. Your request was not confirmed.",
    );
  }

  if (
    typeof result !== "object" ||
    result === null ||
    !("success" in result) ||
    result.success !== true
  ) {
    throw new Error(
      "The server did not confirm receipt. Your request was not recorded.",
    );
  }

  const reference =
    "reference" in result && typeof result.reference === "string"
      ? result.reference
      : undefined;

  return { reference };
}
