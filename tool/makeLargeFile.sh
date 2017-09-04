#!/bin/bash
for i in {0..100000}; do
  echo $i
  echo $RANDOM | md5 >> large.txt
done