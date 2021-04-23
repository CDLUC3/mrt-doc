#!/usr/local/bin/python3

"""
This script utilizes legacy download links to download objects in public Merritt collections.
As of November 2020, said links are still active. Note that these will be deprecated in the
near future.

Specific actions: When given a list of ARKs, the script downloads each Merritt object and saves
a zip archives with the following naming convention, e.g. ark_13030_m5qc02mk.zip
"""

import logging
import requests
import time

from requests.exceptions import HTTPError


def create_log():
    logger = logging.getLogger('Object Download utility')
    logger.setLevel(logging.DEBUG)
    fh = logging.FileHandler('object_download_output.log')
    fh.setLevel(logging.DEBUG)
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)
    logger.addHandler(fh)
    logger.addHandler(ch)
    return logger


def download_objects():
    logger = create_log()
    input_file = open('test_objects.txt')

    for line in input_file:
        try:
            object_url = 'https://merritt.cdlib.org/d/ark%253A%252F13030%252F' + str(line)
            object_request = requests.get(object_url, auth=('name', 'pass'))
            object_request.raise_for_status()
            object_filename = line.strip()
            logger.info('Requesting object ' + object_filename + ' at ' + object_url)
            open('ark_13030_' + object_filename + '.zip', 'wb').write(object_request.content)
            logger.info('Object ' + object_filename + ' downloaded' + '\n')
        except HTTPError as http_err:
            logger.error('HTTP error occurred: ' + str(http_err) + '\n')

        except Exception as err:
            logger.error('Other error occurred: ' + str(err) + '\n')

        time.sleep(.1)

    input_file.close()


if __name__ == '__main__':
    download_objects()
