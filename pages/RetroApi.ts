import type { Page } from '@playwright/test';

const GQL_URL = 'https://www.retrotool.app/api/graph';

async function gql(page: Page, query: string): Promise<any> {
  return page.evaluate(
    async ({ url, q }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query: q }),
      });
      return res.json();
    },
    { url: GQL_URL, q: query },
  );
}

export async function createWorksItem(page: Page, retroSlug: string, title: string) {
  const data = await gql(page, `mutation { createWorksItem(retroSlug: "${retroSlug}", title: "${title}") { id title ref } }`);
  return data.data?.createWorksItem as { id: string; title: string; ref: string } | null;
}

export async function createImproveItem(page: Page, retroSlug: string, title: string) {
  const data = await gql(page, `mutation { createImproveItem(retroSlug: "${retroSlug}", title: "${title}") { id title ref } }`);
  return data.data?.createImproveItem as { id: string; title: string; ref: string } | null;
}

export async function createOtherItem(page: Page, retroSlug: string, title: string) {
  const data = await gql(page, `mutation { createOtherItem(retroSlug: "${retroSlug}", title: "${title}") { id title ref } }`);
  return data.data?.createOtherItem as { id: string; title: string; ref: string } | null;
}

export async function createActionItem(page: Page, retroSlug: string, title: string) {
  const data = await gql(page, `mutation { createActionItem(retroSlug: "${retroSlug}", title: "${title}") { id title } }`);
  return data.data?.createActionItem as { id: string; title: string } | null;
}

export async function removeItem(page: Page, id: string) {
  const data = await gql(page, `mutation { removeItem(id: "${id}") { id } }`);
  return data.data?.removeItem as { id: string } | null;
}

export async function combineItems(page: Page, childId: string, parentId: string) {
  const data = await gql(page, `mutation { combineItems(childId: "${childId}", parentId: "${parentId}") { id } }`);
  return data.data?.combineItems as { id: string } | null;
}

export async function addVote(page: Page, itemId: string) {
  const data = await gql(page, `mutation { addVote(itemId: "${itemId}") { id votes } }`);
  return data.data?.addVote as { id: string; votes: number } | null;
}

export async function transitionToReviewStep(page: Page, slug: string) {
  const data = await gql(page, `mutation { transitionToReviewStep(slug: "${slug}") { __typename } }`);
  return data.data?.transitionToReviewStep ?? null;
}

export async function transitionToActionsStep(page: Page, slug: string) {
  const data = await gql(page, `mutation { transitionToActionsStep(slug: "${slug}") { __typename } }`);
  return data.data?.transitionToActionsStep ?? null;
}

export async function transitionToFinalStep(page: Page, slug: string) {
  const data = await gql(page, `mutation { transitionToFinalStep(slug: "${slug}") { __typename } }`);
  return data.data?.transitionToFinalStep ?? null;
}

export async function updateRetro(page: Page, slug: string, input: Record<string, unknown>, password?: string) {
  const pwArg = password ? `, password: "${password}"` : '';
  const inputStr = JSON.stringify(input).replace(/"([^"]+)":/g, '$1:');
  const data = await gql(page, `mutation { updateRetro(slug: "${slug}"${pwArg}, input: ${inputStr}) { __typename } }`);
  return data.data?.updateRetro ?? null;
}

export async function toggleCompleted(page: Page, id: string) {
  const data = await gql(page, `mutation { toggleCompleted(id: "${id}") { id completed } }`);
  return data.data?.toggleCompleted as { id: string; completed: boolean } | null;
}

export async function detachItem(page: Page, id: string) {
  const data = await gql(page, `mutation { detachItem(id: "${id}") { id } }`);
  return data.data?.detachItem as { id: string } | null;
}
