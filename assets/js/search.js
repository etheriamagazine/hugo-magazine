import {
  h,
  render,
  html,
  signal,
  useSignal,
  useEffect,
  useComputed,
} from "@jslibs/preact-bundle.js";
import MiniSearch from "@jslibs/minisearch.js";

async function fetchIndex() {
  const response = await fetch("/index.json");
  const index = await response.json();
  return index;
}
var docs = await fetchIndex();
let miniSearch = new MiniSearch({
  fields: ["title"], // fields to index for full-text search
  storeFields: ["title"], // fields to return with search results
});
miniSearch.addAll(docs);
console.log("done");

function markHints(result) {
  const hints = {};

  result.terms.forEach((term) => {
    const regexp = new RegExp(`(${term})`, "gi");

    result.match[term].forEach((field) => {
      const value = result[field];

      if (typeof value === "string") {
        hints[field] = value.replace(regexp, "<mark>$1</mark>");
      } else if (field === "headings") {
        const markedValue = value.reduce((items, h) => {
          if (h.title.toLowerCase().includes(term)) {
            items.push({
              id: h.id,
              title: h.title.replace(regexp, "<mark>$1</mark>"),
            });
          }
          return items;
        }, []);
        hints[field] = markedValue.length ? markedValue : null;
      }
    });
  });

  return hints;
}

export function Search(props) {
  const onInput = (event) => (searchText.value = event.currentTarget.value);
  const searchText = useSignal("");
  const isOpen = useSignal(false);
  //   const results = useSignal([{id: '2024/04/lo-mejor.html', text: 'Lo mejor es lo mejor'}]);

  const results = useComputed(() => {
    if (!searchText.value) {
      return [];
    }
    let res = miniSearch
      .search(searchText.value, { prefix: true, fuzzy: 0.2 })
      .map((result) => {
        result.hints = markHints(result);
        return result;
      });
    // console.log(res);
    return res;
  });

  useEffect(() => {
    console.log(results.value);
  });

  useEffect(() => {
    function onKeyDown(event) {
      console.log(event);
      if (
        (event.keyCode == 27 && isOpen.value) ||
        (event.key == "k" && (event.metaKey || event.ctrlKey))
      ) {
        event.preventDefault();

        if (isOpen.value) {
          isOpen.value = false;
        } else {
          isOpen.value = true;
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function execute() {
    alert(searchText.value);
  }

  if (isOpen.value) {
    return html` <div
      class="fixed z-30 top-0 left-0 h-screen w-screen backdrop-blur-sm flex flex-col
      p-8 mb-8 bg-[#0003]"
    >
      <div class="bg-white shadow-lg grow w-full  rounded-lg">
        <div class="flex flex-col">
          <header class="flex border-b border-b-slate-100">
            <form class="flex-auto flex">
              <label>
                <svg
                  width="20"
                  height="20"
                  class="DocSearch-Search-Icon"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                    stroke="currentColor"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </label>
              <input
                class="
                border-0
                outline-0
                &::-webkit-search-cancel-button]:hidden 
                flex-auto appearance-none focus:outline-none
                "
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                type="search"
                value=${searchText}
                onInput=${onInput}
                placeholder="What do you want?"
              />

              <button
                class="
                bg-white rounded-md w-7 h-6 bg-center p-2  shadowS
              
                "
                onClick=${execute}
              >
                a
              </button>
            </form>
          </header>
          <div class="p-8">
            ${results.value.map(
              (item) => html` <p dangerouslySetInnerHTML=${{ __html: item.hints['title'] }}></p> `,
            )}
          </div>
          <footer class="p-8">footer2</footer>
        </div>
      </div>
    </div>`;
  } else {
    return null;
  }
}
