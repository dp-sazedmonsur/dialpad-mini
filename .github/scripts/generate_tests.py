import os
import subprocess
import json
from pathlib import Path
import re

def get_pr_diff(pr_number: str) -> str:
    """Fetch PR diff using GitHub CLI."""
    result = subprocess.run(
        ["gh", "pr", "diff", pr_number],
        capture_output=True, text=True, check=True
    )
    return result.stdout

def extract_jira_key(pr_title: str) -> str:
    """Extract Jira ticket key like DP-12345 from PR title."""
    match = re.search(r"(DP-\d+)", pr_title)
    return match.group(1) if match else None

def call_mcp(tool: str, params: dict) -> dict:
    """
    Call an MCP tool (stub for Claude Desktop).
    """
    payload = {"type": "request", "tool": tool, "params": params}
    print(f"[DEBUG] MCP request → {json.dumps(payload, indent=2)}")
    return {"output": f"# fake pytest test generated for {params}"}

def main():
    pr_number = os.environ.get("PR_NUMBER")
    pr_title = os.environ.get("PR_TITLE")
    if not pr_number or not pr_title:
        raise ValueError("PR_NUMBER and PR_TITLE must be set via GitHub Action env.")

    print(f"[INFO] Processing PR #{pr_number}: {pr_title}")

    # 1. Get PR diff
    diff_text = get_pr_diff(pr_number)
    print(f"[INFO] Retrieved PR diff ({len(diff_text.splitlines())} lines)")

    # 2. Extract Jira ticket
    jira_key = extract_jira_key(pr_title)
    if not jira_key:
        raise RuntimeError("No Jira ID found in PR title (expected format DP-12345)")

    print(f"[INFO] Found Jira ticket: {jira_key}")

    # 3. Get Jira issue context from Atlassian MCP
    jira_data = call_mcp("jira_get_issue", {"issueKey": jira_key})

    # 4. Ask Claude MCP to generate Playwright tests
    prompt = (
        f"Generate Playwright pytest tests for Jira {jira_key}.\n\n"
        f"### Jira Context:\n{json.dumps(jira_data, indent=2)}\n\n"
        f"### PR Diff:\n{diff_text}\n\n"
        "Output only valid pytest test code, no explanation."
    )
    ai_result = call_mcp("generate_tests", {"prompt": prompt})

    # 5. Save generated test file
    out_dir = Path("tests/generated")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / f"test_{jira_key.lower()}.py"
    out_file.write_text(ai_result["output"])

    print(f"[SUCCESS] Test file generated → {out_file}")

if __name__ == "__main__":
    main()