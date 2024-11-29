import { message, danger, warn, fail } from 'danger';

//danger.git.modified_files là những file bị thay đổi
const modifiedMD = danger.git.modified_files.join('- ');
//dòng này ta thêm message cho pull request nói rằng ta đã add những file nào
message('Changed Files in this PR: \n - ' + modifiedMD);

//assignee là người được assigne cho pull request

//danger.github.pr.assignee là người được assigne cho pull request
//nếu như không có người assigne
if (!danger.github.pr.assignee) {
  //WIP: Work In Progress đang xử lý
  //và đang xử lý thì ta sẽ tạo một comment bằng hàm warn
  //warn là một hàm mà ta sẽ gọi để thêm comment vào pull request với mức độ cảnh báo (warning)
  //fail là một hàm mà ta sẽ gọi để thêm comment vào pull request với mức độ lỗi (error)
  const method = danger.github.pr.title.includes('WIP') ? warn : fail;
  //method là một hàm mà ta sẽ gọi để thêm comment vào pull request
  method('Ai đó vui lòng assigne PR này cho mình, và đừng quên thêm label vào PR nữa nhé!');
}

//danger.github.pr.body là nội dung của pull request
//nếu như nội dung của pull request quá ít thì
if (danger.github.pr.body && danger.github.pr.body.length < 10) {
  fail('Đừng quên viết nội dung cho pull request nhé!');
}
