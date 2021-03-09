<?php

/**
 * @param $data
 * @return string
 */

function checkInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

/**
 * @param array $params
 * @return false|int|string
 */

function checkParamsIsExists($params = array())
{

        if($id = array_search (null,$params))
        {
            return $id;
        }
        return false;
}

/**
 * @param $data
 * @return array|mixed
 */

function checkIsArrayOrString($data)
{
    if(is_array($data))
    {
        $output = $data;
    }
    else
    {
        $output = json_decode($data);
    }

    return $output;
}
