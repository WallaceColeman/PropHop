export function get_level(num){
    switch (parseInt(num)) {
      case 0:
        return get_main_menu();
        break;
      case 1:
        return this.get_level_1_scene();
        break;
      // case 2:
      //    day = "Tuesday";
      //   break;
      // case 3:
      //   day = "Wednesday";
      //   break;
      // case 4:
      //   day = "Thursday";
      //   break;
      // case 5:
      //   day = "Friday";
      //   break;
      // case 6:
      //   day = "Saturday";
    }
  }