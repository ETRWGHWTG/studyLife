/*
Navicat MySQL Data Transfer

Source Server         : af
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : shoptest

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-04-04 21:43:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `fl_user`
-- ----------------------------
DROP TABLE IF EXISTS `fl_user`;
CREATE TABLE `fl_user` (
  `fl_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `fl_name` varchar(10) NOT NULL,
  `fl_pwd` varchar(20) NOT NULL,
  PRIMARY KEY (`fl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fl_user
-- ----------------------------
INSERT INTO `fl_user` VALUES ('1', 'abcd', '123456');
INSERT INTO `fl_user` VALUES ('2', 'asdfajk', 'asdfas');
