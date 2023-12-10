let isNull = true;

let calendar = flatpickr("#myID", {
  dateFormat: "d-m-Y",
  onChange: function (selectedDate, dateStr, instance) {
    if (isNull) {
      axios
        .put(
          `${env.DOMAIN_SERVER}:${env.PORT}/api/tasks?field=deadline&id_task=${currentTask.id_task}`,
          { deadline: selectedDate },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then(() => {
          isNull = false;
          currentTask.deadline = new Date(selectedDate).toDateString();
          calendar.clear();
          handleRenderTaskDetail(currentTask.id_task);
          handleRenderTodo(currentBoard);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  onOpen: function (selectedDate, dateStr, instance) {
    // console.log(currentTask, "ehehe");
    isNull = true;
    if (currentTask.deadline) {
      let date = new Date(currentTask.deadline);
      let day = date.getDate() + 1;
      date.setDate(day);
      calendar.setDate(date, false, "d-m-Y");
    }
  },
});
