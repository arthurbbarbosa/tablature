'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { chunk_array } from '../utils/chunk_array.js'

function PageRendered() {
  const [is_visible, set_is_visible] = useState(false)
  const developer_tab_ref = useRef(null)

  const tablature_params = useSearchParams().get('tablature')
  const title_params = useSearchParams().get('title')
  const author_params = useSearchParams().get('author')

  const [tablature, set_tablature] = useState([])
  const [title, set_title] = useState(title_params || 'Untitled Title')
  const [author, set_author] = useState(author_params || 'Untitled Author')

  const [window_size, set_window_size] = useState(0)
  const [is_invalid_tablature, set_invalid_tablature] = useState(false)

  useEffect(() => {
    const handle_window_size = () => set_window_size(window.innerWidth)
    const handle_click_outside = ({ target }) =>
      !developer_tab_ref?.current?.contains(target) && set_is_visible(false)

    document.addEventListener('mousedown', handle_click_outside)
    window.addEventListener('resize', handle_window_size)
    handle_window_size()

    try {
      const parsed_tablature = JSON.parse(tablature_params)
      set_tablature(parsed_tablature)
    } catch (error) {
      set_invalid_tablature(true)
    }

    return () => (
      document.removeEventListener('mousedown', handle_click_outside),
      window.addEventListener('resize', handle_window_size)
    )
  }, [])

  return (
    <>
      <main className="grid gap-8 p-10 max-[385px]:p-2">
        <header className="flex items-center justify-between max-[500px]:flex-col max-[500px]:gap-5 max-[500px]:text-center">
          <div>
            <h1 className="font-black text-3xl" spellCheck="false" contentEditable suppressContentEditableWarning>{title}</h1>
            <h1 className="font-bold -mt-1 text-lg" spellCheck="false" contentEditable suppressContentEditableWarning>{author}</h1>
          </div>

          <div className={`${is_invalid_tablature ? 'block' : 'hidden'}`}>
            <h1 className="font-bold text-white bg-red-500 px-5 rounded-sm">Invalid Tablature</h1>
          </div>

          <div className="flex gap-8 *:bg-black *:rounded-xl *:p-2 *:cursor-pointer *:print:hidden">
            <button onClick={() => window.print()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
              </svg>
            </button>
            <button onClick={() => set_is_visible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
              </svg>
            </button>
            <a href="https://github.com/arthurbbarbosa/tablature">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="size-6">
                <g fill="#fff">
                  <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" />
                  <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
                </g>
              </svg>
            </a>
          </div>
        </header>

        <section>
          {
            chunk_array(tablature, (~~(window_size / 50) - 1)).map((matrix, matrix_index) => (
              <div key={matrix_index} className="mb-10">
                {
                  ['E', 'A', 'D', 'G', 'B', 'E'].map((string, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <h1 className="text-gray-400">{string}</h1>

                      <div className="h-[1px] w-full bg-black relative pl-2">
                        {
                          matrix.filter(([string]) => string === index).map((item, idx) => (
                            <span key={idx} style={{ left: `calc(${matrix.indexOf(item) + .25} * 3rem)` }} className="absolute -top-4 bg-white p-1">
                              {item[1]}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </section>
      </main>

      {
        is_visible && (
          <div ref={developer_tab_ref} id="developer_tab" className="lg:w-1/2 max-lg:w-full absolute top-20 lg:translate-x-1/2 bg-black text-white rounded-3xl p-8 shadow-lg">
            <h1 className="font-bold text-2xl">Insert the tab like a matrix:</h1>

            <table className="mt-2 border border-[#fff] w-full text-left">
              <caption className="mb-2">
                <pre className="bg-[#151b23] w-fit px-2 whitespace-pre-wrap">
                  [[0, 0], [0, 2], [0, 2]]
                </pre>
              </caption>
              <thead>
                <tr className="*:p-2 *:border *:border-[#fff]">
                  <th>String (0 - 5)</th>
                  <th>Fret (0 - ∞)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="*:p-2 *:border *:border-[#fff]">
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr className="*:p-2 *:border *:border-[#fff]">
                  <td>0</td>
                  <td>2</td>
                </tr>
                <tr className="*:p-2 *:border *:border-[#fff]">
                  <td>0</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>

            <form className="grid gap-3 mt-3" onSubmit={({ target }) => (
              set_tablature(JSON.parse(target.elements.tablature.value)),
              set_title(target.elements.title.value),
              set_author(target.elements.author.value)
            )}>
              <div>
                <label htmlFor="tablature" className="opacity-75 font-bold">Tablature Matrix</label>
                <input id="tablature" name="tablature" className="w-full border border-[#fff] rounded-lg px-2 py-1 outline-0 font-[var(--default-mono-font-family)]" defaultValue="[[0, 0], [0, 2], [0, 2]]" />
                </div>
              <div>
                <label htmlFor="title" className="opacity-75 font-bold">Tablature's Title</label>
                <input id="title" name="title" className="w-full border border-[#fff] rounded-lg px-2 py-1 outline-0 font-[var(--default-mono-font-family)]" defaultValue="Untitled Title" />
              </div>
              <div>
                <label htmlFor="author" className="opacity-75 font-bold">Tablature's Author</label>
                <input id="author" name="author" className="w-full border border-[#fff] rounded-lg px-2 py-1 outline-0 font-[var(--default-mono-font-family)]" defaultValue="Untitled Author" />
              </div>
              <div className="flex items-center gap-10 w-full">
                <button type="submit" className="w-1/2 mt-4 cursor-pointer border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition-colors">Submit</button>
                <button onClick={(event) => (event.preventDefault(), navigator.clipboard.writeText(window.location.href))} className="w-1/2 mt-4 cursor-pointer border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition-colors">Copy Link</button>
              </div>
            </form>
          </div>
        )
      }
    </>
  )
}

export default function Page() {
  return (
    <Suspense>
      <PageRendered />
    </Suspense>
  )
}
