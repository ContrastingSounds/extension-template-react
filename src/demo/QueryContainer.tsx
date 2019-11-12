/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React from "react"
import { ILook } from "@looker/sdk"
import { TableDataCell } from "@looker/components/dist/Table/TableCell/TableDataCell"
import { Heading } from "@looker/components/dist/Text/Heading"
import { Text } from "@looker/components/dist/Text/Text"
import { Box } from "@looker/components/dist/Layout/Box"
import { TableHead } from "@looker/components/dist/Table/TableSection/TableHead"
import { TableBody } from "@looker/components/dist/Table/TableSection/TableBody"
import { Table } from "@looker/components/dist/Table"
import { TableRow } from "@looker/components/dist/Table/TableRow/TableRow"
import { TableHeaderCell } from "@looker/components/dist/Table/TableCell/TableHeaderCell"

export interface QueryProps {
  look?: ILook
  results?: string
  running: boolean
}

const headings = (results?: any): Array<String> => {
  if (!results || !results.length || results.length === 0) {
    return []
  }
  return Object.keys(results[0]).map((key) => key)
}

const values = (results?: any): string[][] => {
  if (!results || !results.length || results.length === 0) {
    return []
  }
  return results.map((result: string) => Object.keys(result).map((key) => `${(result as any)[key]}`))
}

export const QueryContainer: React.FC<QueryProps> = ({ look, results, running }) => (
  <Box m='small' width='100%'>
    <Heading as='h3' mb='small'>
      Query:
      {look ? " " + look.title : ""}
    </Heading>
    {running && <Text mr='large'>Running Query ...</Text>}
    {!running && (
      <Table>
        <TableHead>
          <TableRow>
            {headings(results).map((heading, index) => (
              <TableHeaderCell key={index}>{heading}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {values(results)
            .filter((row) => row.find((column) => column !== ""))
            .map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((column, columnIndex) => (
                  <TableDataCell key={`${rowIndex}-${columnIndex}`}>{column}</TableDataCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    )}
  </Box>
)
