import fs from 'fs'

export const dir = (): [string] | null => {
  try {
    // @ts-ignore
    let arr:[string] = []
    fs.readdir(`${__dirname}/../assets/modules`, (err, files) => {
      if (err){
        console.error(err)
        return null
      }
      else {
        files.forEach((file) => {
          arr.push(file)
        })
        return arr
      }
    })
    return arr
  }catch (e) {
    console.error(e)
    return null
  }
}
